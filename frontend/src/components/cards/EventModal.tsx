import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialForm = {
    title: "",
    description: "",
    type: "",
    date: "",
    time: "",
    location: "",
    maxAttendees: "",
    price: ""
};

const types = ["Pitch Competition", "Conference", "Networking", "Showcase", "Demo Day", "Meetup"];

export default function EventModal({ open, onClose, onSubmit }) {
    const [form, setForm] = React.useState(initialForm);
    const [loading, setLoading] = React.useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(form);
        setLoading(false);
        setForm(initialForm);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
                    <Input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
                    <select name="type" value={form.type} onChange={handleChange} required className="w-full border rounded px-3 py-2">
                        <option value="">Select Type</option>
                        {types.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <Input name="date" type="date" value={form.date} onChange={handleChange} required />
                    <Input name="time" type="text" placeholder="Time (e.g. 6:00 PM - 9:00 PM)" value={form.time} onChange={handleChange} required />
                    <Input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
                    <Input name="maxAttendees" type="number" placeholder="Max Attendees" value={form.maxAttendees} onChange={handleChange} required />
                    <Input name="price" placeholder="Price (e.g. Free, $20)" value={form.price} onChange={handleChange} required />
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Event"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
