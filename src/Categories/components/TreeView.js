import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TreeView from "@material-ui/lab/TreeView";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Paper from "@material-ui/core/Paper";
import TreeItem from "@material-ui/lab/TreeItem";
import useSWR from "swr";
import { TREE_URL } from "../containers/constants";
import Suspenser from "../../components/Suspenser";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(3, 2),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const Tree = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const { data } = useSWR(TREE_URL, {
    initialData: [],
    suspense: true,
    refreshInterval: 1000,
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={`${nodes.id}`} label={nodes.fullName}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  const count = data.length;

  return (
    <React.Suspense fallback={<LinearProgress />}>
      <Paper className={classes.root}>
        {count > 0 ? (
          data.map((category) => (
            <ExpansionPanel
              disabled={category.children.length === 0}
              expanded={expanded === category.id}
              onChange={handleChange(category.id)}
              key={category.id}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${category.id}-content`}
                id={`${category.id}-header`}
              >
                <Typography className={classes.heading}>
                  {category.fullName}
                </Typography>
                {/* <Typography className={classes.secondaryHeading}>
              I am an expansion panel
            </Typography> */}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <TreeView
                  multiSelect={false}
                  className={classes.root}
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpanded={[`${category.id}`]}
                  defaultExpandIcon={<ChevronRightIcon />}
                >
                  {renderTree(category)}
                </TreeView>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))
        ) : (
          <Typography>Aucune catégories trouvée</Typography>
        )}
      </Paper>
    </React.Suspense>
  );
};

const CatgoriesTree = () => (
  <Suspenser>
    <Tree />
  </Suspenser>
);

export default CatgoriesTree;
