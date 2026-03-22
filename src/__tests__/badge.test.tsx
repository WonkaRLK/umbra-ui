import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/umbra/badge";

describe("Badge", () => {
  it("renders text", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies success color", () => {
    render(<Badge color="success">Active</Badge>);
    expect(screen.getByText("Active")).toHaveClass("!text-[#22c55e]");
  });
});
