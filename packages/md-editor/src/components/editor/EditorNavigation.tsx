type EditorNavigationProps = {
  onSubmit: () => void;
};

const EditorNavigation: React.FC<EditorNavigationProps> = (props) => {
  return (
    <nav>
      <ul>
        <li>
          <button
            onClick={() => {
              dispatchEvent(new Event('insertContent'));
            }}
          >
            insert
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onSubmit();
            }}
          >
            保存
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default EditorNavigation;
