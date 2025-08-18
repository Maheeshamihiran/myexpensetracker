
import styled from 'styled-components';
export const MainLayout = styled.div`
padding: 2rem;
height: 100%;
display: flex;
gap: 2rem;

/* Desktop (1200px+) */
@media (min-width: 1200px) {
  padding: 2rem;
  gap: 2rem;
}

/* Laptop (992px - 1199px) */
@media (max-width: 1199px) and (min-width: 992px) {
  padding: 1.5rem;
  gap: 1.5rem;
}

/* Tablet and small laptop (1024px and below) */
@media (max-width: 1024px) {
  padding: 1rem;
  gap: 1rem;
  flex-direction: column;
}

/* Tablet (768px - 991px) */
@media (max-width: 991px) and (min-width: 768px) {
  padding: 1rem;
  gap: 1rem;
  flex-direction: column;
}

/* Mobile (767px and below) */
@media (max-width: 767px) {
  padding: 0.5rem;
  gap: 0.5rem;
  flex-direction: column;
}
`;

export const InnerLayout = styled.div`
padding: 2rem 1.5rem;
width: 100%;

/* Desktop (1200px+) */
@media (min-width: 1200px) {
  padding: 2rem 1.5rem;
}

/* Laptop (992px - 1199px) */
@media (max-width: 1199px) and (min-width: 992px) {
  padding: 1.5rem 1rem;
}

/* Tablet (768px - 991px) */
@media (max-width: 991px) and (min-width: 768px) {
  padding: 1rem 0.5rem;
}

/* Mobile (767px and below) */
@media (max-width: 767px) {
  padding: 0.5rem 0.25rem;
}
`; 