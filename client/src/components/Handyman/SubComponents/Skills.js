import { useState } from "react";

const Skills = (props) => {
  const unselectedSkillsList = props.skills.map((skill) => ({
    name: skill.name,
    value: "",
  }));

  const [updatedSkillsList, setUpdatedSkillsList] =
    useState(unselectedSkillsList);

  const handleChange = (event) => {
    const skill = event.target;
    const newList = updatedSkillsList.map((item) => {
      if (item.name === skill.name && skill.checked) {
        return { ...item, value: skill.value };
      }
      return { ...item, value: item.value };
    });
    setUpdatedSkillsList(newList);
    // now send only the selected skills
    props.onChangeHandler(newList.filter(item=>item.value!=="").map(item=>item.value));
  };

  return (
    <div className="skills-list">
      {props.skills.map((skill, index) => (
        <div key={index} className="input-field">
          <input
            type="checkbox"
            id={skill.id}
            name={skill.name}
            value={skill.value}
            onChange={handleChange}
          />{" "}
          <label htmlFor="carpentry">{skill.value}</label>
        </div>
      ))}
    </div>
  );
};

export default Skills;
