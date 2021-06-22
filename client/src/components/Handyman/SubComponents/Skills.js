const Skills = ({ skills }) => {
  return (
    <div className="skills-list">
      {skills.map((skill, index) => (
        <div key={index} className="input-field">
          <input
            type="checkbox"
            id={skill.id}
            name={skill.name}
            value={skill.value}
          />{" "}
          <label htmlFor="carpentry">{skill.name}</label>
        </div>
      ))}
    </div>
  );
};

export default Skills;
