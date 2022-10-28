type EditorNavigationProps = {
  onSubmit: () => void;
};

const EditorNavigation: React.FC<EditorNavigationProps> = (props) => {
  return (
    <nav>
      <ul>
        <li>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              dispatchEvent(new Event('insertContent'));
            }}
          >
            insert
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
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
