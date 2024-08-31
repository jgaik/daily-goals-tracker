import { View, ViewOptions } from '@/constants';

type ViewControlProps = {
  value: View;
  onChange: (newValue: View) => void;
};

export const ViewControl: React.FC<ViewControlProps> = ({
  value,
  onChange,
}) => {
  return (
    <fieldset>
      <legend>View</legend>
      {ViewOptions.map(({ key, label }) => (
        <label key={key}>
          <input
            type='radio'
            name='view'
            value={key}
            checked={value === key}
            onChange={() => onChange(key)}
          />
          {label}
        </label>
      ))}
    </fieldset>
  );
};
