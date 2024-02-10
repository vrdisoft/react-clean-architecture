import * as Muicon from "@material-ui/icons";

type GenerateIconProps = {
  variation: string;
  props?: object
}

function Icon({ variation, props }: GenerateIconProps) {
  {/* @ts-expect-error: Unreachable code error*/ }
  const IconName = Muicon[variation];
  return <IconName {...props} />;
}

export default Icon;