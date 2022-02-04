import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Button } from "@shopify/polaris";
import Background from "@ui/Background";

const Home: NextPage = () => {
  return (
    <Background>
      <Button primary>Home Page</Button>
    </Background>
  );
};

export default Home;
