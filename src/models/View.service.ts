import Errors, { HttpCode, Message } from "../libs/Error";
import { View, ViewInput } from "../libs/types/view";
import ViewModel from "../schema/View.model";

class ViewService {
  [x: string]: any;
  private readonly viewModel;

  constructor() {
    this.viewModel = ViewModel;
  }

  /* CHECK VIEW EXISTENCE */
  public async checkViewExistence(input: ViewInput): Promise<View> {
    return await this.viewModel
      .findOne({
        memberId: input.memberId,
        viewRefId: input.viewRefId,
      })
      .exec();
  }

  /* INSERT MEMBER VIEW */
  public async insertMemberView(input: ViewInput): Promise<View> {
    try {
      return await this.viewModel.create(input);
    } catch (err) {
      console.log("ERROR, model:insertMemberView:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}

export default ViewService;
