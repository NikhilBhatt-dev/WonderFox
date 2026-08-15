import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import { deactivateSubscriber, getSubscribers, sendNewsletter } from "../../services/newsletter.service";

const NewsletterManagement = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [sendingResult, setSendingResult] = useState(null);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const data = await getSubscribers({ search });
      setSubscribers(data || []);
      setSelectedIds((prev) => prev.filter((id) => (data || []).some((item) => item._id === id)));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [search]);

  const visibleSubscribers = useMemo(() => subscribers.filter((item) => item.isActive !== false), [subscribers]);

  const activeCount = visibleSubscribers.length;

  const toggleSelected = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === visibleSubscribers.length) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(visibleSubscribers.map((item) => item._id));
  };

  const handleDeactivate = async (id) => {
    try {
      await deactivateSubscriber(id);
      toast.success("Subscriber removed successfully");
      fetchSubscribers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove subscriber");
    }
  };

  const handleSendNewsletter = async () => {
    if (!subject.trim() || !content.trim()) {
      return toast.error("Please add subject and content before sending.");
    }

    const targetIds = selectedIds.length ? selectedIds : visibleSubscribers.map((item) => item._id);

    try {
      setSending(true);
      const result = await sendNewsletter({
        subject,
        content,
        subscriberIds: targetIds,
      });

      setSendingResult(result);
      toast.success(`Sent to ${result.sent} subscriber${result.sent === 1 ? "" : "s"}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send newsletter");
    } finally {
      setSending(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Newsletter Subscribers</h1>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="admin-card p-5">
          <p className="text-sm text-gray-500">Total subscribers</p>
          <p className="mt-2 text-3xl font-bold">{subscribers.length}</p>
        </div>
        <div className="admin-card p-5">
          <p className="text-sm text-gray-500">Active subscribers</p>
          <p className="mt-2 text-3xl font-bold">{activeCount}</p>
        </div>
        <div className="admin-card p-5">
          <p className="text-sm text-gray-500">Selected</p>
          <p className="mt-2 text-3xl font-bold">{selectedIds.length}</p>
        </div>
      </div>

      <div className="admin-card mb-6 p-4">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search subscribers by email"
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div className="mb-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="admin-card p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold">Subscribers</h2>
            <button type="button" onClick={handleSelectAll} className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium">
              {selectedIds.length === visibleSubscribers.length ? "Unselect all" : "Select all"}
            </button>
          </div>

          {loading ? (
            <p>Loading subscribers...</p>
          ) : subscribers.length === 0 ? (
            <p className="text-gray-500">No subscribers yet.</p>
          ) : (
            <div className="space-y-3">
              {subscribers.map((subscriber) => (
                <div
                  key={subscriber._id}
                  className={`flex items-center justify-between rounded-xl border p-3 ${selectedIds.includes(subscriber._id) ? "border-[#FF6B00] bg-orange-50" : "border-gray-200"}`}
                >
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(subscriber._id)}
                      onChange={() => toggleSelected(subscriber._id)}
                    />
                    <div>
                      <p className="font-medium">{subscriber.email}</p>
                      <p className="text-xs text-gray-500">
                        {subscriber.isActive ? "Active" : "Inactive"} · {new Date(subscriber.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </label>

                  <button type="button" onClick={() => handleDeactivate(subscriber._id)} className="text-sm font-medium text-red-600 hover:underline">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="admin-card p-6">
          <h2 className="mb-5 text-xl font-bold">Compose Newsletter</h2>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Subject</label>
              <input
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Spring launch updates"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Content</label>
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                rows={8}
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Write your newsletter message here..."
              />
            </div>

            <button
              type="button"
              onClick={handleSendNewsletter}
              disabled={sending}
              className="admin-primary-button w-full px-4 py-3 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sending ? "Sending..." : `Send to ${selectedIds.length || activeCount} subscribers`}
            </button>

            {sendingResult && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                Sent: {sendingResult.sent} · Failed: {sendingResult.failed} · Total: {sendingResult.total}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewsletterManagement;
