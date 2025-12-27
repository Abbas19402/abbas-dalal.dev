import Page from "@modules/common/page";
import LandingTemplate from "@modules/landing/template/LandingTemplate";

export default function LandingPage() {
  return (
    <Page
      component={LandingTemplate}
      metadata={{
        title: "Home",
        description: "A Collaborative project management web tool",
      }}
    />
  );
}
