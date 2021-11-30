import { GenericRefListDropDown } from './genericRefListDropDown';
import { RawRefListDropDown } from './rawRefListDropDown';
import { DtoRefListDropDown } from './dtoRefListDropDown';

export { IRefListDropDownProps, IRefListDropDownOption } from './models';
export { RawRefListDropDown } from './rawRefListDropDown';
export { DtoRefListDropDown } from './dtoRefListDropDown';

type InternalDropDownType = typeof GenericRefListDropDown;
interface InternalDropDownInterface extends InternalDropDownType {
  Raw: typeof RawRefListDropDown;
  Dto: typeof DtoRefListDropDown;
}

const DropDownInterface = GenericRefListDropDown as InternalDropDownInterface;
DropDownInterface.Raw = RawRefListDropDown;
DropDownInterface.Dto = DtoRefListDropDown;

export default DropDownInterface;