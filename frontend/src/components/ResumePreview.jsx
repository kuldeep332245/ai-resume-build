import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

const ResumePreview = ({ resumeData }) => {
  const pdfRef = useRef();

  const downloadPDF = () => {
    const element = pdfRef.current;
    const opt = {
      margin: 1,
      filename: `${resumeData?.personalInfo?.fullName || 'Resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
  };

  if (!resumeData) {
    return <div style={styles.empty}>No resume data to preview</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>📄 Resume Preview</h2>
        <button onClick={downloadPDF} style={styles.downloadBtn}>
          ⬇️ Download PDF
        </button>
      </div>

      {/* Resume Preview */}
      <div ref={pdfRef} style={styles.resumeContainer}>
        <div style={styles.resume}>
          {/* Header */}
          <div style={styles.resumeHeader}>
            <h1 style={styles.name}>{resumeData.personalInfo?.fullName || 'Your Name'}</h1>
            <p style={styles.contact}>
              {resumeData.personalInfo?.email} • {resumeData.personalInfo?.phone} • {resumeData.personalInfo?.address}
            </p>
            <p style={styles.summary}>{resumeData.personalInfo?.summary}</p>
          </div>

          {/* Education */}
          {resumeData.education?.length > 0 && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🎓 Education</h3>
              {resumeData.education.map((edu, i) => (
                <div key={i} style={styles.item}>
                  <p style={styles.itemTitle}>{edu.degree} - {edu.institution}</p>
                  <p style={styles.itemSub}>{edu.year} • Grade: {edu.grade}</p>
                </div>
              ))}
            </div>
          )}

          {/* Experience */}
          {resumeData.experience?.length > 0 && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>💼 Experience</h3>
              {resumeData.experience.map((exp, i) => (
                <div key={i} style={styles.item}>
                  <p style={styles.itemTitle}>{exp.jobTitle} - {exp.company}</p>
                  <p style={styles.itemSub}>{exp.years}</p>
                  <p style={styles.itemDesc}>{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {resumeData.skills?.length > 0 && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🛠️ Skills</h3>
              <div style={styles.skillsContainer}>
                {resumeData.skills.map((skill, i) => (
                  <span key={i} style={styles.skillTag}>{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {resumeData.projects?.length > 0 && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🚀 Projects</h3>
              {resumeData.projects.map((proj, i) => (
                <div key={i} style={styles.item}>
                  <p style={styles.itemTitle}>{proj.title}</p>
                  <p style={styles.itemDesc}>{proj.description}</p>
                  <p style={styles.itemSub}>Tech: {proj.techStack}</p>
                  {proj.link && <a href={proj.link} style={styles.link}>🔗 GitHub</a>}
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {resumeData.languages?.length > 0 && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🌐 Languages</h3>
              {resumeData.languages.map((lang, i) => (
                <div key={i} style={styles.item}>
                  <p style={styles.itemTitle}>{lang.name} - {lang.proficiency}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    background: '#0f172a',
    minHeight: '80vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1000px',
    margin: '0 auto 20px',
  },
  title: {
    color: 'white',
    fontSize: '24px',
  },
  downloadBtn: {
    background: '#10b981',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  resumeContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    overflow: 'hidden',
  },
  resume: {
    padding: '40px',
    color: '#1e293b',
  },
  resumeHeader: {
    borderBottom: '2px solid #3b82f6',
    paddingBottom: '20px',
    marginBottom: '20px',
  },
  name: {
    fontSize: '32px',
    marginBottom: '5px',
    color: '#0f172a',
  },
  contact: {
    color: '#64748b',
    fontSize: '14px',
    marginBottom: '10px',
  },
  summary: {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#334155',
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '20px',
    color: '#0f172a',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '8px',
    marginBottom: '10px',
  },
  item: {
    marginBottom: '10px',
  },
  itemTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#0f172a',
  },
  itemSub: {
    fontSize: '14px',
    color: '#64748b',
  },
  itemDesc: {
    fontSize: '14px',
    color: '#334155',
    marginTop: '5px',
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  skillTag: {
    background: '#e2e8f0',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '14px',
  },
  link: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontSize: '14px',
  },
  empty: {
    color: '#94a3b8',
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
  },
};

export default ResumePreview;