const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nodeSchema = new Schema(
    {
        name: { type: String, required: true },
        childIds: [{ type: Schema.Types.ObjectId, ref: 'Node' }],
        path: String,
    }
);

nodeSchema.index({ path: 1 });

module.exports = mongoose.model('Node', nodeSchema);
