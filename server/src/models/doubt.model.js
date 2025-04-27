import { Schema, model } from 'mongoose';

const doubtSchema = new Schema({
    doubtId: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    studentId: {
        type: String,
        ref: 'User',
    },
    sessionId: {
        type: String,
        ref: 'Lecture',
    },
    embedding: {
        type: [Number],
        default: [],
    }, // SBERT embedding
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Doubt = model('Doubt', doubtSchema);

const clusterSchema = new Schema({
    groupId: {
        type: Number,
        required: true,
        unique: true,
    },
    representative: {
        type: String,
        required: true,
    },
    doubtIds: {
        type: [String], 
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Cluster = model('Cluster', clusterSchema);
