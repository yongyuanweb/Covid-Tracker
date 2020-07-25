import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
function InfoBox({ title, cases, total }) {
  return (
    <Card>
      <CardContent>
        {/*Title i.e. ConornaViurs cases*/}
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>
        {/*Cases i.e.  cases*/}
        <h2 className="infoBox_cases">{cases}</h2>
        {/*Total i.e. Total cases*/}
        <Typography className="infoBox_total" color="textSecondary">
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
