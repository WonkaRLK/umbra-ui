import { render } from "@testing-library/react";
import { Separator } from "@/components/umbra/separator";

describe("Separator", () => {
  it("renders horizontal separator", () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toHaveClass("h-px");
  });

  it("renders vertical separator", () => {
    const { container } = render(<Separator orientation="vertical" />);
    expect(container.firstChild).toHaveClass("w-px");
  });
});
