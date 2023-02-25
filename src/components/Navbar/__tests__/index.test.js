import { render } from '@testing-library/react';
import Navbar from '..';

describe('Navbar', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<Navbar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
