import { render ,screen} from "@testing-library/react"
import Contact from "../Contact"
import "@testing-library/jest-dom";

test('Contact component should render',()=>{
    render(<Contact/>)
    let heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();

})