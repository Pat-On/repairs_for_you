import { useEffect, useState } from "react";

const allSkills = [
  { name: "brickLaying", value: "Brick laying" },
  { name: "carpentry", value: "Carpentry" },
  { name: "electricalWork", value: "Electrical Work" },
  {
    name: "installAndRepair",
    value: "Appliance installation and repair",
  },
  {
    name: "propertyMaintenance",
    value: "Interior and exterior property maintenance",
  },
  { name: "tiling", value: "Tiling" },
  { name: "plastering", value: "Plastering" },
  { name: "plumbing", value: "Plumbing" },
  { name: "painting", value: "Painting" },
  { name: "decorating", value: "Decorating" },
];

const Skills = (props) => {

  const unselectedSkillsList = allSkills.map((skill) => ({
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
    props.onChangeHandler(
      newList.filter((item) => item.value !== "").map((item) => item.value)
    );
  };

  return (
    <div className="skills-list">
      {allSkills.map((skill, index) => (
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
