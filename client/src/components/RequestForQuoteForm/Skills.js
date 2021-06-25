const Skills = ({ skills }) => {
  return (
    <div>
      {skills.map((skill, index) => (
        <div key={index} className="input-field">
          <span>{skill}</span>
        </div>
      ))}
    </div>
  );
};

export default Skills;
