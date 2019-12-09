import React from "react";
import DeleteButton from "./DeleteButton";

export interface IDefaultInputSection {
  value: string;
  onChange: (value: string) => void;
  onDelete: () => void;
  hideInput: (value: boolean) => void;
}

export default ({ value, onChange, onDelete,hideInput  }: IDefaultInputSection) => {
  return (
    <div className="rp-default-input-section">
      <input
        className="rp-default-input-section_input"
        placeholder="INPUT TAG HERE"
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={() => hideInput(false)}
      />
      <a className="rp-default-input-section_delete" onClick={() => onDelete()}>
        <DeleteButton />
      </a>
    </div>
  );
};
