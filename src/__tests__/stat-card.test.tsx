import { render, screen } from "@testing-library/react";
import { StatCard } from "@/components/umbra/stat-card";

describe("StatCard", () => {
  it("renders label and value", () => {
    render(<StatCard label="Revenue" value="$24.8k" />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$24.8k")).toBeInTheDocument();
  });

  it("shows upward trend indicator", () => {
    render(<StatCard label="Users" value={1429} trend="up" trendValue="+12%" />);
    expect(screen.getByText(/↑/)).toBeInTheDocument();
  });
});
