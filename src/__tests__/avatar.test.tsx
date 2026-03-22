import { render, screen } from "@testing-library/react";
import { Avatar } from "@/components/umbra/avatar";

describe("Avatar", () => {
  it("shows initials from fallback", () => {
    render(<Avatar fallback="John Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders image when src provided", () => {
    render(<Avatar src="/photo.jpg" alt="Photo" fallback="JD" />);
    expect(screen.getByRole("img")).toHaveAttribute("src", "/photo.jpg");
  });
});
