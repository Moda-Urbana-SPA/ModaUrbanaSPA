import { Button, ButtonGroup } from 'react-bootstrap';
import './Product.css';

export default function Filters({ current, onChange, options, total }) {
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
      <div className="text-muted small mb-2 mb-sm-0">
      </div>
      <ButtonGroup>
        <Button
          className={`badge-black ${current === 'all' ? 'active' : ''}`}
          onClick={() => onChange('all')}
        >
          Todos
        </Button>
        {options.map((c) => (
          <Button
            key={c}
            className={`badge-black ${current === c ? 'active' : ''}`}
            onClick={() => onChange(c)}
          >
            {c}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
