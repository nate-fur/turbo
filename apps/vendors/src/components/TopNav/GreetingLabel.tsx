import Image from "next/image";
import { Box, Typography } from "@mui/material";

interface GreetingLabelProps {
  labelText?: string;
  sx?: object;
  height?: number;
}

export const GreetingLabel = ({
  labelText,
  sx,
  height = 36,
}: GreetingLabelProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        alignItems: "center",
        height,
        ...sx,
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          border: "1px solid lightgray",
          height,
          borderRadius: 4,
          px: 2,
          pr: 5,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            fontSize: "0.75rem",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {labelText ? `Hi ${labelText}` : "Welcome!"}
        </Typography>
      </Box>
      <Box
        sx={{
          right: -4,
          height,
          width: height,
          position: "absolute",
          borderRadius: "100%",
          border: "2px solid #000",
          overflow: "hidden",
          display: "flex",
          alignItems: "end",
          justifyContent: "center",
          bgcolor: "white",
        }}
      >
        <Image
          src="/assets/images/DogAvatar.svg"
          alt="Avatar"
          width={height - 2}
          height={height - 2}
        />
      </Box>
    </Box>
  );
};
