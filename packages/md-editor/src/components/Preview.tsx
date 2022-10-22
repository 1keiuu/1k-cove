import '../style/preview.css';

type PreviewProps = {
  content: string;
};

const Preview: React.FC<PreviewProps> = (props) => {
  return <div className="preview">{props.content}</div>;
};

export default Preview;
