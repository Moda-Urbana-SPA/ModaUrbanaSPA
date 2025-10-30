import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Offcanvas,
  Stack,
  Badge,
} from 'react-bootstrap';
import './Product.css'; 

export default function Filters({ current, onChange, options, total }) {
  const [open, setOpen] = useState(false);
  const active = current !== 'all' ? [current] : [];

  const FilterButtons = ({ vertical = false, onItemClick }) => (
    <Stack direction={vertical ? 'vertical' : 'horizontal'} gap={2}>
      <ButtonGroup vertical={vertical}>
        <Button
          className={`badge-black ${current === 'all' ? 'active' : ''}`}
          onClick={() => onItemClick ? onItemClick('all') : onChange('all')}
        >
          Todos {typeof total === 'number' ? `(${total})` : ''}
        </Button>
      </ButtonGroup>
      <ButtonGroup vertical={vertical}>
        {options.map((c) => (
          <Button
            key={c}
            className={`badge-black ${current === c ? 'active' : ''}`}
            onClick={() => onItemClick ? onItemClick(c) : onChange(c)}
          >
            {c}
          </Button>
        ))}
      </ButtonGroup>
    </Stack>
  );

  return (
    <div className="mb-3">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div className="d-flex align-items-center gap-2">
          {active.length > 0 ? (
            <>
              <span className="text-muted small">Filtro:</span>
              {active.map((t) => (
                <Badge key={t} bg="dark">{t}</Badge>
              ))}
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={() => onChange('all')}
              >
                Limpiar
              </Button>
            </>
          ) : (
            <span className="text-muted small">Mostrando todos</span>
          )}
        </div>

        <div className="d-none d-md-block">
          <FilterButtons />
        </div>

        <div className="d-md-none ms-auto">
          <Button variant="dark" onClick={() => setOpen(true)}>
            Filtros
          </Button>
        </div>
      </div>

      <Offcanvas show={open} onHide={() => setOpen(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtros</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mb-3">
            <div className="text-muted small mb-2">
              {active.length > 0 ? (
                <>
                  Activo: <strong>{active.join(', ')}</strong>
                </>
              ) : (
                <>Sin filtros activos</>
              )}
            </div>
            <FilterButtons
              vertical
              onItemClick={(val) => {
                onChange(val);
                setOpen(false);
              }}
            />
          </div>

          <Button
            variant="secondary"
            onClick={() => {
              onChange('all');
              setOpen(false);
            }}
          >
            Limpiar filtros
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
