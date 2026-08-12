const axios = require('axios');

const getAISuggestions = async (req, res) => {
  try {
    const { resume } = req.body;

    if (!resume) {
      return res.status(400).json({ message: 'Resume data is required' });
    }

    // Resume ka data ek simple text mein convert karo AI ko bhejne ke liye
    const resumeText = `
Professional Summary: ${resume.personalInfo?.summary || 'Not provided'}

Work Experience:
${resume.experience?.map(exp => `- ${exp.jobTitle} at ${exp.company}: ${exp.description}`).join('\n') || 'None'}

Skills: ${resume.skills?.join(', ') || 'None'}

Projects:
${resume.projects?.map(p => `- ${p.title}: ${p.description}`).join('\n') || 'None'}
    `.trim();

    const prompt = `You are a professional resume reviewer. Analyze this resume and give 4-5 short, specific, actionable suggestions to improve it (better wording, missing keywords, quantifiable achievements, ATS optimization). Keep each suggestion to 1-2 lines. Format as a simple bullet list.

Resume:
${resumeText}`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000,
      }
    );

    const aiText = response.data.candidates[0].content.parts[0].text;

    res.json({ suggestions: aiText });
  } catch (error) {
    console.error('AI Suggestion Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to get AI suggestions. Please try again.' });
  }
};

module.exports = { getAISuggestions };