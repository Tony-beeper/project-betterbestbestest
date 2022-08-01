import React from "react";
import RoundedBoxContainer from "../../components/Containers/RoundedBoxContainer/RoundedBoxContainer";
import PageContainer from "../../components/Containers/PageContainer/PageContainer";
import CodebookLink from "../../components/CodebookLink/CodebookLink";
import SectionHeading from "../../components/Headings/SectionHeading";

const CreditsPage = () => {
  return (
    <PageContainer>
      <RoundedBoxContainer>
        <SectionHeading>Credits</SectionHeading>
        <ul>
          <li>
            {"Colors from "}
            <CodebookLink href="https://github.com/">Github</CodebookLink>
          </li>
          <li>
            {"UI and icons from "}
            <CodebookLink href="https://v4.mui.com/">MUI</CodebookLink>
          </li>
          <li>
            {"Background GIF from "}
            <CodebookLink href="https://github.com/l3n0ire/portfolio/blob/master/src/components/pages/images/background.gif">
              here
            </CodebookLink>
          </li>
        </ul>
        <SectionHeading>Team Members</SectionHeading>
        <ul>
          <li>
            <CodebookLink href="https://github.com/l3n0ire">
              Colin Lin
            </CodebookLink>
          </li>
          <li>
            <CodebookLink href="https://github.com/CharlesXu123">
              Shengsong Xu
            </CodebookLink>
          </li>
          <li>
            <CodebookLink href="https://github.com/Tony-beeper">
              Youxin Tan
            </CodebookLink>
          </li>
        </ul>
      </RoundedBoxContainer>
    </PageContainer>
  );
};

export default CreditsPage;
