const Skills = ({ formId }) => {
  return (
    <fieldset className="input-field-group skills-group" name={formId}>
      <legend className="subtitle">Skills</legend>
      <div className="input-field">
        <input
          type="checkbox"
          id="bricklaying"
          name={formId}
          value="Brick laying"
        />{" "}
        <label htmlFor="bricklaying">Brick laying</label>
        <div className="input-field">
          <input
            type="checkbox"
            id="carpentry"
            name={formId}
            value="Carpentry"
          />{" "}
          <label htmlFor="carpentry">Carpentry</label>
        </div>
        <div className="input-field">
          <input
            type="checkbox"
            id="electrical-work"
            name={formId}
            value="Electrical Work"
          />{" "}
          <label htmlFor="electrical-work">Electrical Work</label>
        </div>
        <div className="input-field">
          <input
            type="checkbox"
            id="appliance-install-maintain"
            name={formId}
            value="Appliance installation and repair"
          />{" "}
          <label htmlFor="appliance-install-maintain">
            Appliance installation and repair
          </label>
        </div>
        <div className="input-field">
          <input
            type="checkbox"
            id="peroperty-maintenance"
            name={formId}
            value="Interior and exterior property maintenance"
          />{" "}
          <label htmlFor="peroperty-maintenance">
            Interior and exterior property maintenance
          </label>
        </div>
        <div className="input-field">
          <input type="checkbox" id="tiling" name={formId} value="Tiling" />{" "}
          <label htmlFor="tiling">Tiling</label>
        </div>
        <div className="input-field">
          <input
            type="checkbox"
            id="plastering"
            name={formId}
            value="Plastering"
          />{" "}
          <label htmlFor="plastering">Plastering</label>
        </div>
        <div className="input-field">
          <input type="checkbox" id="plumbing" name={formId} value="Plumbing" />{" "}
          <label htmlFor="plumbing">Plumbing</label>
        </div>
      </div>
    </fieldset>
  );
};

export default Skills;
