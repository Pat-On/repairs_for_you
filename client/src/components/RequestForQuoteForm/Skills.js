const Skills = ({ skills }) => {
  return (
    <ul className="skills">
      {skills.map((skill, index) => (
        <li key={index} className="input-field">
          <span>{skill}</span>
        </li>
      ))}
    </ul>
  );
};

export default Skills;
