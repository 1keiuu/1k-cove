import './switchTab.css';

type SwitchTabProps = {
  items: { value: string; name: string }[];
  activeItemName: string;
  onTabItemClick: (name: string) => void;
};
const SwitchTab: React.FC<SwitchTabProps> = (props) => {
  return (
    <ul className="switch-tab">
      {props.items.map((item) => {
        return (
          <li
            key={`switch-tab-item-${item.name}`}
            className={`switch-tab-item ${
              props.activeItemName === item.name ? '--active' : ''
            }`}
            onClick={() => {
              props.onTabItemClick(item.name);
            }}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
};
export default SwitchTab;
