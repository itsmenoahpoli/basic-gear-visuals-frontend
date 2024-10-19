import React from "react";
import { Theme, Flex } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";

export const AuthLayout: React.FC = () => {
  return (
    <Theme appearance="dark">
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1, // Keep video behind content
            objectFit: 'cover', // Cover the entire background
            pointerEvents: 'none', // Prevent interaction with the video
          }}
        >
          <source src="/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // Adjust opacity for darkness
          zIndex: 0, // Ensure it is above the video but below the content
        }} />

        {/* Foreground Content */}
        <Flex
          justify="center"
          align="center"
          direction="column"
          gap="2"
          className="h-screen"
          style={{
            zoom: 0.75,
            zIndex: 1,
            color: "#ffffff",
            backdropFilter: "blur(5px)",
          }}
        >
          <h1 className="text-2xl font-bold">BGV LABS</h1>
          <p className="mb-5">Learning Management Platform</p>

          <Outlet />

          <p className="text-sm mt-4">All Rights Reserved. &copy; 2024</p>
        </Flex>
      </div>
    </Theme>
  );
};
