import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "@/components/umbra/tabs";

const TABS = [
  { value: "a", label: "Tab A", content: <p>Content A</p> },
  { value: "b", label: "Tab B", content: <p>Content B</p> },
];

describe("Tabs", () => {
  it("shows first tab content by default", () => {
    render(<Tabs tabs={TABS} />);
    expect(screen.getByText("Content A")).toBeInTheDocument();
  });

  it("switches content on tab click", async () => {
    render(<Tabs tabs={TABS} />);
    await userEvent.click(screen.getByText("Tab B"));
    expect(screen.getByText("Content B")).toBeInTheDocument();
  });
});
