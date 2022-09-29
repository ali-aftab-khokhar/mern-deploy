import CONSTANTS from "../constants";
import BaseServiceClass from "./baseServiceClass";

class CommentService extends BaseServiceClass{
    deleteTheComment(comment_id) {
        this.deleteMethod(`comment/${comment_id}`)
    }

    publishNewComment(payload, post_id) {
        this.postMethod(payload, CONSTANTS.COMMENTED, `${post_id}/comments`)
    }

    editTheComment(payload, comment_id) {
        this.putMethod(payload, CONSTANTS.UPDATED, `comments/${comment_id}`)
    }
}

export default CommentService