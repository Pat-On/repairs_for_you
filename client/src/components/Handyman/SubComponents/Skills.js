const Skills = ({ skills, formId }) => {
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
          <label htmlFor="carpentry">Carpentry</label>
        </div>
      ))}
    </div>
  );
};

export default Skills;
