import { render, screen, act } from "@testing-library/react";
import { ToastProvider, useToast } from "@/components/umbra/toast";

function Trigger() {
  const { toast } = useToast();
  return <button onClick={() => toast({ message: "Saved!", variant: "success" })}>Show</button>;
}

describe("Toast", () => {
  it("shows toast on trigger", async () => {
    render(<ToastProvider><Trigger /></ToastProvider>);
    act(() => { screen.getByRole("button").click(); });
    expect(await screen.findByText("Saved!")).toBeInTheDocument();
  });
});
