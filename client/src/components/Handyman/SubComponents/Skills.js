const Skills = ({ skills, formId }) => {
  console.log(skills)
  return (
    <div>
      {skills.map((skill, index) => (
        <div key={index} className="input-field">
          <input
            type="checkbox"
            id={skill.id}
            name={formId}
            value={skill.name}
          />{" "}
          <label htmlFor="carpentry">{skill.name}</label>
        </div>
      ))}
    </div>
  );
};

export default Skills;
