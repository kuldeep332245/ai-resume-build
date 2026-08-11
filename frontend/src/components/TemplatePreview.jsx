import React from 'react';
import { templates } from '../data/templates';

const TemplatePreview = ({ resumeData, templateId }) => {
  const template = templates[templateId] || templates.modern;
  const colors = template.colors;

  if (!resumeData) {
    return <div style={styles.empty}>No resume data to preview</div>;
  }

  return (
    <div style={{ ...styles.container, borderColor: colors[0], borderTop: `4px solid ${colors[0]}` }}>
      {/* Header */}
      <div style={{ ...styles.header, background: colors[1] }}>
        <h1 style={{ ...styles.name, color: colors[2] }}>
          {resumeData.personalInfo?.fullName || 'Your Name'}
        </h1>
        <p style={{ ...styles.contact, color: colors[2] }}>
          {resumeData.personalInfo?.email} • {resumeData.personalInfo?.phone} • {resumeData.personalInfo?.address}
        </p>
        <p style={{ ...styles.summary, color: colors[2] }}>
          {resumeData.personalInfo?.summary}
        </p>
      </div>

      <div style={styles.body}>
        {/* Education */}
        {resumeData.education?.length > 0 && (
          <div style={styles.section}>
            <h3 style={{ ...styles.sectionTitle, color: colors[0] }}>🎓 Education</h3>
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
            <h3 style={{ ...styles.sectionTitle, color: colors[0] }}>💼 Experience</h3>
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
            <h3 style={{ ...styles.sectionTitle, color: colors[0] }}>🛠️ Skills</h3>
            <div style={styles.skillsContainer}>
              {resumeData.skills.map((skill, i) => (
                <span key={i} style={{ ...styles.skillTag, background: colors[0], color: '#fff' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resumeData.projects?.length > 0 && (
          <div style={styles.section}>
            <h3 style={{ ...styles.sectionTitle, color: colors[0] }}>🚀 Projects</h3>
            {resumeData.projects.map((proj, i) => (
              <div key={i} style={styles.item}>
                <p style={styles.itemTitle}>{proj.title}</p>
                <p style={styles.itemDesc}>{proj.description}</p>
                <p style={styles.itemSub}>Tech: {proj.techStack}</p>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {resumeData.languages?.length > 0 && (
          <div style={styles.section}>
            <h3 style={{ ...styles.sectionTitle, color: colors[0] }}>🌐 Languages</h3>
            {resumeData.languages.map((lang, i) => (
              <div key={i} style={styles.item}>
                <p style={styles.itemTitle}>{lang.name} - {lang.proficiency}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    padding: '30px',
    textAlign: 'center',
  },
  name: {
    fontSize: '32px',
    marginBottom: '5px',
  },
  contact: {
    fontSize: '14px',
    marginBottom: '10px',
  },
  summary: {
    fontSize: '16px',
    lineHeight: '1.5',
    maxWidth: '600px',
    margin: '0 auto',
  },
  body: {
    padding: '30px',
    color: '#1e293b',
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '20px',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
    marginBottom: '10px',
  },
  item: {
    marginBottom: '10px',
  },
  itemTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
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
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '14px',
  },
  empty: {
    color: '#94a3b8',
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
  },
};

export default TemplatePreview;