import CONSTANTS from "../constants";
import BaseServiceClass from "./baseServiceClass";

class CommentService extends BaseServiceClass{
    deleteTheComment(comment_id) {
        this.deleteMethod(`comment/${comment_id}`, CONSTANTS.DELETION_FAILED)
    }

    publishNewComment(payload, post_id) {
        this.postMethod(payload, CONSTANTS.COMMENTED, CONSTANTS.PUBLISHED_FAILED, `${post_id}/comments`)
    }

    editTheComment(payload, comment_id) {
        this.putMethod(payload, CONSTANTS.UPDATED, CONSTANTS.EDIT_FAILED, `comments/${comment_id}`)
    }
}

export default CommentService