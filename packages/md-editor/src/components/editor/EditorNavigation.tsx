const EditorNavigation = () => {
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
      </ul>
    </nav>
  );
};

export default EditorNavigation;
