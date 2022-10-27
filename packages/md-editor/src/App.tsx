import { useCallback, useState } from 'react';
import './style/App.css';
import Editor from './components/Editor';
import Preview from './components/Preview';
import SwitchTab from './components/shared/SwitchTab';
import EditorNavigation from './components/editor/EditorNavigation';

function App() {
  const [displayMode, setDisplayMode] = useState<'editor' | 'preview'>(
    'editor'
  );
  const [content, setContent] = useState('');
  const handleContentChange = useCallback((content: string) => {
    setContent(content);
  }, []);
  const tabItems = [
    {
      name: 'editor',
      value: 'Editor',
    },
    {
      name: 'preview',
      value: 'Preview',
    },
  ];
  const handleSubmit = () => {
    console.log(content);
  };
  return (
    <div className="app">
      <div className="wrapper">
        <SwitchTab
          items={tabItems}
          activeItemName={displayMode}
          onTabItemClick={(name) => {
            setDisplayMode(name as 'editor' | 'preview');
          }}
        ></SwitchTab>
        <div className="inner">
          {displayMode === 'editor' ? (
            <Editor
              content={content}
              onContentChange={handleContentChange}
            ></Editor>
          ) : (
            <Preview content={content}></Preview>
          )}
        </div>
      </div>
      <EditorNavigation onSubmit={handleSubmit}></EditorNavigation>
    </div>
  );
}

export default App;
