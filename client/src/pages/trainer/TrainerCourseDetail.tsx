import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Add, ArrowLeft, Edit2, Export, ProfileTick, Send2, Setting4, Trash, TrendUp, Profile2User } from 'iconsax-react';
import { PortalLayout } from '../../components/portal/PortalLayout';
import { Pagination } from '../../components/ui/Pagination';
import { cx } from '../../lib/format';
import { inputClass } from '../../lib/inputStyle';
import { useToast } from '../../lib/toast';
import { coursePosts, courseCategories, trainerCourses, trainerLearners, type CoursePost } from '../../lib/trainerData';

type Tab = 'overview' | 'settings' | 'space';

const tabs: Array<{ id: Tab; label: string }> = [
  { id: 'overview', label: 'Over View' },
  { id: 'settings', label: 'Course Settings' },
  { id: 'space', label: 'Course Space' },
];

const learnerStatusStyle: Record<string, string> = {
  Ongoing: 'bg-[var(--sematic-backgrounds-primarybackground-2)] text-primary-text',
  Completed: 'bg-[#f0fdf4] text-[#15803d]',
  'On Hold': 'bg-line-soft text-muted',
  'Dropped Out': 'bg-[#fef2f2] text-[#b91c1c]',
};

const PAGE_SIZE = 10;

export const TrainerCourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const course = trainerCourses.find((item) => item.id === id);
  const [tab, setTab] = useState<Tab>('overview');
  const [page, setPage] = useState(1);
  const [thread, setThread] = useState<CoursePost | null>(null);
  const [comment, setComment] = useState('');
  const [postFilter, setPostFilter] = useState<'All Topic' | 'Announcements' | 'Discussion'>('All Topic');

  if (!course) return <Navigate to="/trainer/courses" replace />;

  const learners = trainerLearners.slice(0, 24);
  const pageCount = Math.max(1, Math.ceil(learners.length / PAGE_SIZE));
  const visibleLearners = learners.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const posts = coursePosts.filter((post) =>
    postFilter === 'All Topic' ? true : postFilter === 'Announcements' ? post.kind === 'Announcement' : post.kind === 'Discussion',
  );

  return (
    <PortalLayout role="trainer">
      <div className="flex flex-col gap-6 gutter page-y">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <button type="button" onClick={() => navigate('/trainer/courses')} aria-label="Back to courses" className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink">
              <ArrowLeft size={18} variant="Linear" color="currentColor" />
            </button>
            <h1 className="truncate text-xl font-semibold text-ink sm:text-2xl">{course.title}</h1>
            <span className="hidden shrink-0 rounded-full bg-[var(--sematic-backgrounds-primarybackground-2)] px-3 py-1 text-xs font-medium text-primary-text sm:inline">
              {course.category}
            </span>
          </div>
          <div className="flex items-center gap-3 text-muted">
            <button type="button" aria-label="Delete course" onClick={() => showToast('Course deleted.')} className="text-[#ff5025]">
              <Trash size={18} variant="Linear" color="currentColor" />
            </button>
            <Link to={`/trainer/courses/${course.id}/builder`} aria-label="Edit course" className="text-primary-text">
              <Edit2 size={18} variant="Linear" color="currentColor" />
            </Link>
            <button type="button" aria-label="Course settings" onClick={() => setTab('settings')}>
              <Setting4 size={18} variant="Linear" color="currentColor" />
            </button>
            <button type="button" aria-label="Share course" onClick={() => showToast('Share link copied.')}>
              <Export size={18} variant="Linear" color="currentColor" />
            </button>
          </div>
        </div>

        <div className="h-[180px] w-full overflow-hidden rounded-xl sm:h-[260px]">
          <img src={course.image} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: Profile2User, tint: '#dcfce7', label: 'Total Applicants', value: course.applicants },
            { icon: ProfileTick, tint: '#dff4ff', label: 'Active Learners', value: course.activeLearners },
            { icon: TrendUp, tint: '#ffe9dd', label: 'Avg Completion', value: `${course.avgCompletion}%` },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 rounded-xl border border-line-soft p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: stat.tint }}>
                <stat.icon size={18} variant="Bold" color="#202020" />
              </span>
              <div className="flex flex-col">
                <span className="text-xs text-muted">{stat.label}</span>
                <span className="text-lg font-semibold text-ink">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex overflow-x-auto border-b border-line-soft scrollbar-none">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setTab(item.id);
                setThread(null);
              }}
              className={cx(
                'flex-1 shrink-0 px-6 py-3 text-sm whitespace-nowrap transition-colors',
                tab === item.id ? 'border-b-2 border-primary-text font-semibold text-primary-text' : 'text-muted hover:text-ink',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {tab === 'overview' ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <input placeholder="Search learner" className={cx(inputClass, 'sm:w-[280px]')} />
              <button type="button" onClick={() => showToast('Export started.')} className="flex items-center gap-2 text-sm font-medium text-primary-text">
                <Export size={16} variant="Linear" color="currentColor" />
                Export learners
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-line-soft">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-line-soft bg-[#fafafa] text-xs text-muted">
                  <tr>
                    {['Name', 'City', 'Email Address', 'Status', 'Actions'].map((heading) => (
                      <th key={heading} className="px-4 py-3 font-medium">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visibleLearners.map((learner) => (
                    <tr key={learner.id} className="border-b border-line-soft last:border-0">
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-2.5">
                          <img src={learner.avatar} alt="" className="size-8 shrink-0 rounded-full object-cover" />
                          <span className="font-medium text-ink">{learner.name}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted">{learner.city}</td>
                      <td className="px-4 py-3 text-muted">{learner.email}</td>
                      <td className="px-4 py-3">
                        <span className={cx('rounded-full px-2.5 py-1 text-xs font-medium', learnerStatusStyle[learner.status])}>{learner.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-3 text-muted">
                          <Trash size={16} variant="Linear" color="currentColor" />
                          <Send2 size={16} variant="Linear" color="currentColor" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center">
              <Pagination page={page} pageCount={pageCount} onChange={setPage} />
            </div>
          </div>
        ) : null}

        {tab === 'settings' ? (
          <div className="flex max-w-[520px] flex-col gap-5">
            <div className="flex flex-col gap-[6px]">
              <span className="text-sm font-medium text-ink">Course Price</span>
              <input defaultValue={course.priceNgn === 0 ? 'Free' : String(course.priceNgn)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-[6px]">
              <span className="text-sm font-medium text-ink">Choose certificate template</span>
              <select className={cx(inputClass, 'appearance-none')} defaultValue="Template 12A">
                {['Template 12A', 'Template 12B', 'Template 12C'].map((template) => (
                  <option key={template}>{template}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-[6px]">
              <span className="text-sm font-medium text-ink">Category</span>
              <select className={cx(inputClass, 'appearance-none')} defaultValue={course.category}>
                {courseCategories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="relative h-[160px] w-full overflow-hidden rounded-lg">
              <img src={course.image} alt="" className="h-full w-full object-cover" />
              <button type="button" onClick={() => showToast('Cover image updated.')} className="absolute inset-0 flex items-center justify-center bg-black/35 text-sm font-medium text-white">
                Change Cover Image
              </button>
            </div>
            <button
              type="button"
              onClick={() => showToast('Course settings saved.')}
              className="flex h-[38px] items-center justify-center self-start rounded-lg bg-primary px-8 text-sm font-medium text-white sm:h-[43px]"
            >
              Save Changes
            </button>
          </div>
        ) : null}

        {tab === 'space' ? (
          thread ? (
            <div className="flex flex-col gap-4 rounded-xl border border-line-soft p-5">
              <button type="button" onClick={() => setThread(null)} className="flex items-center gap-2 self-start text-sm font-medium text-muted">
                <ArrowLeft size={16} variant="Linear" color="currentColor" />
                Go Back
              </button>
              <div className="flex flex-col gap-2 rounded-xl border border-line-soft p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[var(--sematic-backgrounds-primarybackground-2)] px-2.5 py-1 text-xs font-medium text-primary-text">{thread.kind}</span>
                  <span className="text-xs text-muted">{thread.postedAt}</span>
                </div>
                <p className="text-sm font-semibold text-ink">{thread.title}</p>
                <p className="text-sm leading-5 text-muted">{thread.body}</p>
              </div>
              <p className="text-center text-xs text-muted">No replies yet. Be the first</p>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-ink">Comment</span>
                <textarea
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="Start typing ..."
                  className={cx(inputClass, 'h-24 resize-none py-3')}
                />
                <button
                  type="button"
                  disabled={!comment.trim()}
                  onClick={() => {
                    showToast('Reply posted.');
                    setComment('');
                  }}
                  className="flex h-[38px] items-center justify-center self-end rounded-lg bg-primary px-8 text-sm font-medium text-white transition-opacity disabled:opacity-40 sm:h-[43px]"
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {(['All Topic', 'Announcements', 'Discussion'] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setPostFilter(filter)}
                      className={cx(
                        'rounded-full border px-4 py-1.5 text-xs font-medium transition-colors',
                        postFilter === filter
                          ? 'border-[var(--sematic-interactivecomponents-primaryic-2)] bg-[var(--sematic-backgrounds-primarybackground-2)] text-primary-text'
                          : 'border-line-strong text-muted hover:text-ink',
                      )}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => showToast('Post published.')} className="flex h-[38px] items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white sm:h-[43px]">
                    <Add size={16} variant="Linear" color="currentColor" />
                    Make a post
                  </button>
                  <button type="button" onClick={() => showToast('Announcement sent.')} className="flex h-[38px] items-center gap-2 rounded-lg bg-[#d54600] px-4 text-sm font-medium text-white sm:h-[43px]">
                    <Add size={16} variant="Linear" color="currentColor" />
                    Make Announcement
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {posts.map((post) => (
                  <button
                    key={post.id}
                    type="button"
                    onClick={() => setThread(post)}
                    className={cx(
                      'flex flex-col gap-2 rounded-xl border p-4 text-left transition-colors hover:border-primary',
                      post.kind === 'Announcement' ? 'border-[#ffd9c7] bg-[#fff8f4]' : 'border-line-soft',
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className={cx('rounded-full px-2.5 py-1 text-xs font-medium', post.kind === 'Announcement' ? 'bg-[#ffe9e2] text-[#d54600]' : 'bg-[var(--sematic-backgrounds-primarybackground-2)] text-primary-text')}>
                        {post.kind}
                      </span>
                      <span className="text-xs text-muted">{post.postedAt}</span>
                    </div>
                    <p className="text-sm font-semibold text-ink">{post.title}</p>
                    <p className="line-clamp-2 text-xs leading-5 text-muted">{post.body}</p>
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>{post.replies} Replies</span>
                      {post.author ? <span>{post.author}</span> : null}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )
        ) : null}
      </div>
    </PortalLayout>
  );
};
