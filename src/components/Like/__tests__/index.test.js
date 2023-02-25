import { render, screen } from "@testing-library/react";
import Like from "..";

describe("Like", () => {
    it('should show red heart when liked is true', () => {
        render(<Like isLiked={true} likesCount={15} onClick={jest.fn()}/>)
        const likeIcon = screen.getByAltText("like-icon");
        expect(likeIcon.src).toContain("red");
    });
    it('should show gray heart when liked is false', () => {
        render(<Like isLiked={false} likesCount={15} onClick={jest.fn()}/>)
        const likeIcon = screen.getByAltText("like-icon");
        expect(likeIcon.src).toContain("gray");
    });
    it('should show 15 likes when likesCount is 15', () => {
        render(<Like isLiked={false} likesCount={15} onClick={jest.fn()}/>)
        const likesCount = screen.getByText("15");
        expect(likesCount).toBeTruthy();
    });
    it('should call the onClick function when like is clicked', () => {
        const onClick = jest.fn();
        render(<Like isLiked={false} likesCount={15} onClick={onClick}/>)
        const likeIcon = screen.getByAltText("like-icon");
        likeIcon.click();
        expect(onClick).toHaveBeenCalled();
    });
});