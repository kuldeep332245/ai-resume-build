import { templates } from '../data/templates';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const ResumeBuilder = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const resumeId = searchParams.get('id');

  const [resume, setResume] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      summary: '',
    },
    education: [{ degree: '', institution: '', year: '', grade: '' }],
    experience: [{ jobTitle: '', company: '', years: '', description: '' }],
    skills: [''],
    projects: [{ title: '', description: '', techStack: '', link: '' }],
    certifications: [{ name: '', organization: '', date: '', link: '' }],
    languages: [{ name: '', proficiency: '' }],
    template: 'modern',
    status: 'draft',
  });

  const [loading, setLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');

  // Fetch resume data if editing
  useEffect(() => {
    if (resumeId) {
      fetchResumeData();
    }
  }, [resumeId]);

  const fetchResumeData = async () => {
    try {
      const response = await API.get(`/resume/${resumeId}`);
      setResume(response.data);
    } catch (error) {
      alert('Error fetching resume data');
    }
  };

  const handleChange = (section, index, field, value) => {
    const newResume = { ...resume };
    if (index !== undefined) {
      newResume[section][index][field] = value;
    } else {
      newResume[section] = value;
    }
    setResume(newResume);
  };

  const addField = (section) => {
    const newResume = { ...resume };
    if (section === 'education') {
      newResume.education.push({ degree: '', institution: '', year: '', grade: '' });
    } else if (section === 'experience') {
      newResume.experience.push({ jobTitle: '', company: '', years: '', description: '' });
    } else if (section === 'skills') {
      newResume.skills.push('');
    } else if (section === 'projects') {
      newResume.projects.push({ title: '', description: '', techStack: '', link: '' });
    } else if (section === 'certifications') {
      newResume.certifications.push({ name: '', organization: '', date: '', link: '' });
    } else if (section === 'languages') {
      newResume.languages.push({ name: '', proficiency: '' });
    }
    setResume(newResume);
  };

  const removeField = (section, index) => {
    const newResume = { ...resume };
    newResume[section] = newResume[section].filter((_, i) => i !== index);
    setResume(newResume);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (resumeId) {
        await API.put(`/resume/${resumeId}`, resume);
        alert('✅ Resume updated successfully!');
      } else {
        await API.post('/resume/create', resume);
        alert('✅ Resume saved successfully!');
      }
      navigate('/dashboard');
    } catch (error) {
      alert('❌ Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const getAISuggestions = async () => {
    setLoading(true);
    try {
      setAiSuggestion('💡 Add more quantifiable achievements. Use action verbs like "developed", "managed", "created". Include relevant keywords for ATS.');
    } catch (error) {
      alert('AI suggestions failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>{resumeId ? '✏️ Edit Resume' : '📝 Build Your Professional Resume'}</h2>

        {/* Personal Info */}
        <section style={styles.section}>
          <h3 style={styles.subtitle}>Personal Information</h3>
          <input type="text" placeholder="Full Name" value={resume.personalInfo.fullName} onChange={(e) => handleChange('personalInfo', undefined, 'fullName', e.target.value)} style={styles.input} />
          <input type="email" placeholder="Email" value={resume.personalInfo.email} onChange={(e) => handleChange('personalInfo', undefined, 'email', e.target.value)} style={styles.input} />
          <input type="text" placeholder="Phone" value={resume.personalInfo.phone} onChange={(e) => handleChange('personalInfo', undefined, 'phone', e.target.value)} style={styles.input} />
          <input type="text" placeholder="Address" value={resume.personalInfo.address} onChange={(e) => handleChange('personalInfo', undefined, 'address', e.target.value)} style={styles.input} />
          <textarea placeholder="Professional Summary" value={resume.personalInfo.summary} onChange={(e) => handleChange('personalInfo', undefined, 'summary', e.target.value)} style={styles.textarea} />
        </section>

        {/* Education */}
        <section style={styles.section}>
          <h3 style={styles.subtitle}>🎓 Education</h3>
          {resume.education.map((edu, i) => (
            <div key={i} style={styles.group}>
              <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleChange('education', i, 'degree', e.target.value)} style={styles.input} />
              <input type="text" placeholder="Institution" value={edu.institution} onChange={(e) => handleChange('education', i, 'institution', e.target.value)} style={styles.input} />
              <input type="text" placeholder="Year" value={edu.year} onChange={(e) => handleChange('education', i, 'year', e.target.value)} style={styles.input} />
              <input type="text" placeholder="Grade/CGPA" value={edu.grade} onChange={(e) => handleChange('education', i, 'grade', e.target.value)} style={styles.input} />
              <button type="button" onClick={() => removeField('education', i)} style={styles.removeBtn}>❌ Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addField('education')} style={styles.addBtn}>+ Add Education</button>
        </section>

        {/* Experience */}
        <section style={styles.section}>
          <h3 style={styles.subtitle}>💼 Work Experience</h3>
          {resume.experience.map((exp, i) => (
            <div key={i} style={styles.group}>
              <input type="text" placeholder="Job Title" value={exp.jobTitle} onChange={(e) => handleChange('experience', i, 'jobTitle', e.target.value)} style={styles.input} />
              <input type="text" placeholder="Company" value={exp.company} onChange={(e) => handleChange('experience', i, 'company', e.target.value)} style={styles.input} />
              <input type="text" placeholder="Years" value={exp.years} onChange={(e) => handleChange('experience', i, 'years', e.target.value)} style={styles.input} />
              <textarea placeholder="Description" value={exp.description} onChange={(e) => handleChange('experience', i, 'description', e.target.value)} style={styles.textarea} />
              <button type="button" onClick={() => removeField('experience', i)} style={styles.removeBtn}>❌ Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addField('experience')} style={styles.addBtn}>+ Add Experience</button>
        </section>

        {/* Skills */}
        <section style={styles.section}>
          <h3 style={styles.subtitle}>🛠️ Skills</h3>
          {resume.skills.map((skill, i) => (
            <div key={i} style={styles.group}>
              <input type="text" placeholder="Skill" value={skill} onChange={(e) => {
                const newSkills = [...resume.skills];
                newSkills[i] = e.target.value;
                setResume({ ...resume, skills: newSkills });
              }} style={styles.input} />
              <button type="button" onClick={() => {
                const newSkills = resume.skills.filter((_, index) => index !== i);
                setResume({ ...resume, skills: newSkills });
              }} style={styles.removeBtn}>❌ Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addField('skills')} style={styles.addBtn}>+ Add Skill</button>
        </section>

        {/* Projects */}
        <section style={styles.section}>
          <h3 style={styles.subtitle}>🚀 Projects</h3>
          {resume.projects.map((proj, i) => (
            <div key={i} style={styles.group}>
              <input type="text" placeholder="Project Title" value={proj.title} onChange={(e) => handleChange('projects', i, 'title', e.target.value)} style={styles.input} />
              <textarea placeholder="Description" value={proj.description} onChange={(e) => handleChange('projects', i, 'description', e.target.value)} style={styles.textarea} />
              <input type="text" placeholder="Tech Stack" value={proj.techStack} onChange={(e) => handleChange('projects', i, 'techStack', e.target.value)} style={styles.input} />
              <input type="text" placeholder="GitHub Link" value={proj.link} onChange={(e) => handleChange('projects', i, 'link', e.target.value)} style={styles.input} />
              <button type="button" onClick={() => removeField('projects', i)} style={styles.removeBtn}>❌ Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addField('projects')} style={styles.addBtn}>+ Add Project</button>
        </section>

        {/* Certifications */}
        <section style={styles.section}>
          <h3 style={styles.subtitle}>📜 Certifications</h3>
          {resume.certifications.map((cert, i) => (
            <div key={i} style={styles.group}>
              <input type="text" placeholder="Certificate Name" value={cert.name} onChange={(e) => {
                const newCerts = [...resume.certifications];
                newCerts[i].name = e.target.value;
                setResume({ ...resume, certifications: newCerts });
              }} style={styles.input} />
              <input type="text" placeholder="Organization" value={cert.organization} onChange={(e) => {
                const newCerts = [...resume.certifications];
                newCerts[i].organization = e.target.value;
                setResume({ ...resume, certifications: newCerts });
              }} style={styles.input} />
              <input type="text" placeholder="Date" value={cert.date} onChange={(e) => {
                const newCerts = [...resume.certifications];
                newCerts[i].date = e.target.value;
                setResume({ ...resume, certifications: newCerts });
              }} style={styles.input} />
              <input type="text" placeholder="Certificate Link" value={cert.link} onChange={(e) => {
                const newCerts = [...resume.certifications];
                newCerts[i].link = e.target.value;
                setResume({ ...resume, certifications: newCerts });
              }} style={styles.input} />
              <button type="button" onClick={() => removeField('certifications', i)} style={styles.removeBtn}>❌ Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addField('certifications')} style={styles.addBtn}>+ Add Certification</button>
        </section>

        {/* Languages */}
        <section style={styles.section}>
          <h3 style={styles.subtitle}>🌐 Languages</h3>
          {resume.languages.map((lang, i) => (
            <div key={i} style={styles.group}>
              <input type="text" placeholder="Language" value={lang.name} onChange={(e) => {
                const newLangs = [...resume.languages];
                newLangs[i].name = e.target.value;
                setResume({ ...resume, languages: newLangs });
              }} style={styles.input} />
              <select value={lang.proficiency} onChange={(e) => {
                const newLangs = [...resume.languages];
                newLangs[i].proficiency = e.target.value;
                setResume({ ...resume, languages: newLangs });
              }} style={styles.select}>
                <option value="">Select</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Fluent">Fluent</option>
                <option value="Native">Native</option>
              </select>
              <button type="button" onClick={() => removeField('languages', i)} style={styles.removeBtn}>❌ Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addField('languages')} style={styles.addBtn}>+ Add Language</button>
        </section>

        
        {/* Template Selection */}
<section style={styles.section}>
  <h3 style={styles.subtitle}>🎨 Select Template</h3>
  <div style={styles.templateGrid}>
    {Object.values(templates).map((tpl) => (
      <div
        key={tpl.id}
        onClick={() => setResume({ ...resume, template: tpl.id })}
        style={{
          ...styles.templateCard,
          border: resume.template === tpl.id ? '3px solid #3b82f6' : '2px solid #334155',
          background: resume.template === tpl.id ? '#1e293b' : '#0f172a',
        }}
      >
        <div style={styles.templateIcon}>{tpl.icon}</div>
        <h4 style={styles.templateName}>{tpl.name}</h4>
        <p style={styles.templatePreview}>{tpl.preview}</p>
        <div style={styles.colorDots}>
          {tpl.colors.map((color, i) => (
            <span key={i} style={{ ...styles.colorDot, background: color }} />
          ))}
        </div>
      </div>
    ))}
  </div>
</section>
        {/* Buttons */}
        <div style={styles.buttonGroup}>
          <button type="button" onClick={getAISuggestions} style={styles.aiBtn} disabled={loading}>
            🤖 Get AI Suggestions
          </button>
          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? 'Saving...' : resumeId ? '✏️ Update Resume' : '💾 Save Resume'}
          </button>
        </div>

        {/* AI Suggestions Display */}
        {aiSuggestion && (
          <div style={styles.aiSuggestion}>
            <h4 style={styles.aiTitle}>✨ AI Suggestions</h4>
            <p style={styles.aiText}>{aiSuggestion}</p>
          </div>
        )}
      </form>
    </div>
  );
};

const styles = {
  container: { minHeight: '80vh', padding: '40px 20px', background: '#0f172a' },
  form: { maxWidth: '800px', margin: '0 auto', background: '#1e293b', padding: '40px', borderRadius: '12px' },
  title: { color: 'white', fontSize: '32px', textAlign: 'center', marginBottom: '30px' },
  section: { marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #334155' },
  subtitle: { color: '#60a5fa', fontSize: '20px', marginBottom: '15px' },
  input: { width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: 'white', fontSize: '16px', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: 'white', fontSize: '16px', minHeight: '80px', boxSizing: 'border-box' },
  select: { width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: 'white', fontSize: '16px' },
  group: { background: '#0f172a', padding: '15px', borderRadius: '8px', marginBottom: '10px' },
  addBtn: { background: '#334155', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', marginTop: '5px' },
  removeBtn: { background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', marginTop: '5px' },
  buttonGroup: { display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '20px' },
  submitBtn: { flex: 1, padding: '14px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' },
  aiBtn: { flex: 1, padding: '14px', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' },
  aiSuggestion: { marginTop: '20px', background: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #8b5cf6' },
  aiTitle: { color: '#8b5cf6', marginBottom: '10px' },
  aiText: { color: '#94a3b8', lineHeight: '1.6' },
};

export default ResumeBuilder;