const Skills = ({ skills }) => {
  return (
    <div className="button-style-labels">
      {skills.map((skill,index) => 
        <span key={index}>{skill}{" "}</span>
      )}
    </div>
  );
};

export default Skills;
