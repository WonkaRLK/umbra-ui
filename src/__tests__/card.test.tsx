import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/umbra/card";

describe("Card", () => {
  it("renders all sub-components", () => {
    render(
      <Card>
        <CardHeader><CardTitle>Title</CardTitle></CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
