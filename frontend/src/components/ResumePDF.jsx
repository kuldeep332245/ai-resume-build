import React from "react";
import "../styles/ResumePreview.css";

function ResumePDF({
  personal,
  education = [],
  experience = [],
  projects = [],
  skills = [],
  languages = [],
  certificates = [],
}) {
  // =========================
  // SKILLS
  // =========================

  const skillList =
    typeof skills === "string"
      ? skills
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : skills;


  // =========================
  // LANGUAGES
  // =========================

  const languageList =
    typeof languages === "string"
      ? languages
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : languages;


  // =========================
  // HEADER
  // =========================

  return (
    <div id="resume-pdf" className="resume-pdf">

      {/* =========================
          HEADER
          ========================= */}

      <header className="pdf-header">

        <h1>
          {personal?.fullName || "YOUR NAME"}
        </h1>


        <div className="pdf-contact">

          {personal?.email && (
            <span>{personal.email}</span>
          )}

          {personal?.phone && (
            <span>{personal.phone}</span>
          )}

          {personal?.location && (
            <span>{personal.location}</span>
          )}

        </div>


        <div className="pdf-links">

          {personal?.linkedin && (
            <span>{personal.linkedin}</span>
          )}

          {personal?.github && (
            <span>{personal.github}</span>
          )}

          {personal?.portfolio && (
            <span>{personal.portfolio}</span>
          )}

        </div>

      </header>


      {/* =========================
          PROFESSIONAL SUMMARY
          ========================= */}

      {personal?.summary && (
        <section className="pdf-section">

          <h2>Professional Summary</h2>

          <p>
            {personal.summary}
          </p>

        </section>
      )}


      {/* =========================
          SKILLS
          ========================= */}

      {skillList.length > 0 && (
        <section className="pdf-section">

          <h2>Skills</h2>

          <div className="pdf-skills">

            {skillList.map((skill, index) => (

              <span key={index}>
                • {skill}
              </span>

            ))}

          </div>

        </section>
      )}


      {/* =========================
          WORK EXPERIENCE
          ========================= */}

      {experience.length > 0 && (
        <section className="pdf-section">

          <h2>Work History</h2>


          {experience.map((job, index) => (

            <div
              className="pdf-experience"
              key={index}
            >

              <div className="pdf-row">

                <div>

                  <strong>
                    {job.role ||
                      job.jobRole ||
                      job.position ||
                      "Job Role"}
                  </strong>


                  <div className="pdf-company">

                    {job.company ||
                      job.companyName ||
                      ""}

                  </div>

                </div>


                <div className="pdf-date">

                  {job.startDate || ""}

                  {job.startDate &&
                    (job.endDate ||
                      job.currentlyWorking)
                    ? " - "
                    : ""}

                  {job.currentlyWorking
                    ? "Present"
                    : job.endDate || ""}

                </div>

              </div>


              {job.description && (
                <p>
                  {job.description}
                </p>
              )}


              {job.achievements && (
                <p>
                  {job.achievements}
                </p>
              )}

            </div>

          ))}

        </section>
      )}


      {/* =========================
          PROJECTS
          ========================= */}

      {projects.length > 0 && (
        <section className="pdf-section">

          <h2>Projects</h2>


          {projects.map((project, index) => (

            <div
              className="pdf-project"
              key={index}
            >

              <strong>

                {project.name ||
                  project.projectName ||
                  "Project"}

              </strong>


              {project.description && (
                <p>
                  {project.description}
                </p>
              )}


              {project.technologies && (
                <p>
                  <strong>Technologies:</strong>{" "}
                  {project.technologies}
                </p>
              )}

            </div>

          ))}

        </section>
      )}


      {/* =========================
          EDUCATION
          ========================= */}

      {education.length > 0 && (
        <section className="pdf-section">

          <h2>Education</h2>


          {education.map((edu, index) => (

            <div
              className="pdf-education"
              key={index}
            >

              <div className="pdf-row">

                <div>

                  <strong>

                    {edu.degree ||
                      edu.course ||
                      "Degree"}

                  </strong>


                  <div>

                    {edu.college ||
                      edu.institution ||
                      edu.university ||
                      ""}

                  </div>

                </div>


                <div className="pdf-date">

                  {edu.year ||
                    edu.passingYear ||
                    ""}

                </div>

              </div>


              {edu.field && (
                <div>
                  {edu.field}
                </div>
              )}


              {edu.grade && (
                <div>
                  {edu.grade}
                </div>
              )}

            </div>

          ))}

        </section>
      )}


      {/* =========================
          LANGUAGES
          ========================= */}

      {languageList.length > 0 && (
        <section className="pdf-section">

          <h2>Languages</h2>

          <p>
            {languageList.join(" • ")}
          </p>

        </section>
      )}


      {/* =========================
          CERTIFICATES
          ========================= */}

      {certificates.length > 0 && (
        <section className="pdf-section">

          <h2>Certifications</h2>


          {certificates.map((certificate, index) => (

            <div
              className="pdf-certificate"
              key={index}
            >

              <strong>

                {certificate.name ||
                  certificate.title ||
                  "Certificate"}

              </strong>


              {certificate.issuer && (
                <span>
                  {" - "}
                  {certificate.issuer}
                </span>
              )}


              {certificate.year && (
                <span>
                  {" ("}
                  {certificate.year}
                  {")"}
                </span>
              )}


              {certificate.link && (
                <div>
                  {certificate.link}
                </div>
              )}

            </div>

          ))}

        </section>
      )}

    </div>
  );
}

export default ResumePDF;