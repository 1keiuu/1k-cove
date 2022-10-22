import { useCallback, useState } from 'react';
import './style/App.css';
import Editor from './components/Editor';
import Preview from './components/Preview';

function App() {
  const [content, setContent] = useState('');
  const handleContentChange = useCallback((content: string) => {
    setContent(content);
  }, []);

  return (
    <div className="app">
      <div className="wrapper">
        <Editor onContentChange={handleContentChange}></Editor>
      </div>
      <div className="wrapper">
        <Preview content={content}></Preview>
      </div>
    </div>
  );
}

export default App;
