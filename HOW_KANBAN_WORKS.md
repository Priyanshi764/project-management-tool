# 📋 How the Kanban Board Works

## 🎯 Overview

Your Kanban board has **3 columns** that organize tasks by their status:

```
┌─────────────┬─────────────┬─────────────┐
│   📋 TO DO  │ ⚡ IN PROGRESS │  ✅ DONE   │
├─────────────┼─────────────┼─────────────┤
│             │             │             │
│  [Task 1]   │  [Task 3]   │  [Task 5]   │
│  [Task 2]   │  [Task 4]   │  [Task 6]   │
│             │             │             │
└─────────────┴─────────────┴─────────────┘
```

## 🔄 How to Move Tasks Between Columns

### Method: Status Dropdown (Currently Active)

Each task card has a dropdown at the bottom that controls which column it appears in.

**Visual Example**:
```
┌─────────────────────────────────┐
│ 🔴Bug 🔵Feature                 │
│                                 │
│ Fix login authentication        │
│ Update JWT token handling       │
│                                 │
│ ✅ 2/3 ████████░░ 67%           │
│ 📅 Due: Dec 31, 2024            │
│                                 │
│ [📋 To Do ▼]  ← CLICK HERE!    │  ← This dropdown moves the task
│ [Details] [🗑️]                  │
└─────────────────────────────────┘
```

### Step-by-Step Instructions

#### 1️⃣ Moving a Task to "In Progress"

**Scenario**: You start working on a task

1. Find the task in the **"To Do"** column
2. Click the dropdown that says **"📋 To Do"**
3. Select **"⚡ In Progress"**
4. ✨ **Magic!** The task instantly moves to the "In Progress" column

```
BEFORE:                          AFTER:
┌─────────────┐                 ┌─────────────┐
│   TO DO     │                 │   TO DO     │
├─────────────┤                 ├─────────────┤
│ [Task A] ←  │                 │             │
│ [Task B]    │                 │ [Task B]    │
└─────────────┘                 └─────────────┘

┌─────────────┐                 ┌─────────────┐
│ IN PROGRESS │                 │ IN PROGRESS │
├─────────────┤                 ├─────────────┤
│             │                 │ [Task A] ←  │ Moved here!
└─────────────┘                 └─────────────┘
```

#### 2️⃣ Completing a Task

**Scenario**: You finish working on a task

1. Find the task in the **"In Progress"** column
2. Click the dropdown that says **"⚡ In Progress"**
3. Select **"✅ Done"**
4. ✨ The task moves to the "Done" column

```
BEFORE:                          AFTER:
┌─────────────┐                 ┌─────────────┐
│ IN PROGRESS │                 │ IN PROGRESS │
├─────────────┤                 ├─────────────┤
│ [Task A] ←  │                 │             │
└─────────────┘                 └─────────────┘

┌─────────────┐                 ┌─────────────┐
│    DONE     │                 │    DONE     │
├─────────────┤                 ├─────────────┤
│             │                 │ [Task A] ←  │ Completed!
└─────────────┘                 └─────────────┘
```

#### 3️⃣ Moving a Task Back

**Scenario**: You need to reopen a completed task

1. Find the task in the **"Done"** column
2. Click the dropdown that says **"✅ Done"**
3. Select **"📋 To Do"** or **"⚡ In Progress"**
4. ✨ The task moves back to the selected column

## 🎬 Live Demo Script (30 seconds)

### Try This Right Now:

1. **Open your project** in the browser
2. **Create a test task**:
   - Click "+ Add Task"
   - Title: "Test moving tasks"
   - Click "Create Task"
3. **Task appears in "To Do" column**
4. **Click the dropdown** on the task card (shows "📋 To Do")
5. **Select "⚡ In Progress"**
6. **Watch it move!** Task disappears from "To Do" and appears in "In Progress"
7. **Click the dropdown again** (now shows "⚡ In Progress")
8. **Select "✅ Done"**
9. **Watch it move again!** Task moves to "Done" column

## 🔧 How It Works (Technical)

### Frontend Code

When you change the dropdown, this happens:

```javascript
// In TaskCard.jsx
<select
  value={task.status}
  onChange={(e) => onStatusChange(task._id, e.target.value)}
>
  <option value="todo">📋 To Do</option>
  <option value="in-progress">⚡ In Progress</option>
  <option value="done">✅ Done</option>
</select>
```

### Backend Update

```javascript
// In ProjectDetail.jsx
const handleStatusChange = async (taskId, newStatus) => {
  // 1. Send update to backend
  const res = await axios.put(
    `http://localhost:5000/api/tasks/${taskId}`,
    { status: newStatus },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  // 2. Update local state (moves task in UI)
  setTasks(tasks.map((task) => 
    task._id === taskId ? res.data : task
  ));

  // 3. Refresh activity feed
  fetchActivities();
};
```

### Database Update

```javascript
// In backend/controllers/taskController.js
// Updates the task status in MongoDB
await Task.findByIdAndUpdate(taskId, { status: newStatus });
```

## 🎨 Visual States

### Task in "To Do" Column
```
┌─────────────────────────────────┐
│ 🔴Bug                           │
│ Fix authentication              │
│ [📋 To Do ▼]                    │ ← Gray background
└─────────────────────────────────┘
```

### Task in "In Progress" Column
```
┌─────────────────────────────────┐
│ 🔴Bug                           │
│ Fix authentication              │
│ [⚡ In Progress ▼]              │ ← Blue background
└─────────────────────────────────┘
```

### Task in "Done" Column
```
┌─────────────────────────────────┐
│ 🔴Bug                           │
│ Fix authentication              │
│ [✅ Done ▼]                     │ ← Green background
└─────────────────────────────────┘
```

## 📊 Column Counters

Each column header shows how many tasks it contains:

```
┌─────────────────────────────┐
│ 📋 To Do              [3]   │ ← 3 tasks in this column
├─────────────────────────────┤
│ [Task 1]                    │
│ [Task 2]                    │
│ [Task 3]                    │
└─────────────────────────────┘
```

The counter updates automatically when you move tasks!

## 🎯 Common Workflows

### Workflow 1: Starting Work
```
1. Find task in "To Do"
2. Change dropdown to "In Progress"
3. Start working on it
```

### Workflow 2: Completing Work
```
1. Find task in "In Progress"
2. Change dropdown to "Done"
3. Task is complete!
```

### Workflow 3: Reopening Task
```
1. Find task in "Done"
2. Change dropdown to "In Progress"
3. Continue working on it
```

### Workflow 4: Planning Ahead
```
1. Create multiple tasks
2. All start in "To Do"
3. Move them to "In Progress" as you work
4. Move to "Done" when complete
```

## 🚀 Future Enhancement: Drag & Drop

**Currently**: You use the dropdown to move tasks

**Coming Soon**: You'll be able to drag tasks between columns!

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   TO DO     │     │ IN PROGRESS │     │    DONE     │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ [Task A]    │ ──→ │             │     │             │
│             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
      Drag and drop to move!
```

The drag & drop library (@dnd-kit) is already installed, just needs to be implemented!

## ✅ Quick Reference

| Action | Steps |
|--------|-------|
| **Start working on task** | To Do → Click dropdown → Select "In Progress" |
| **Complete task** | In Progress → Click dropdown → Select "Done" |
| **Reopen task** | Done → Click dropdown → Select "To Do" or "In Progress" |
| **Move task back** | Any column → Click dropdown → Select different status |

## 🎯 Tips

1. **Use "To Do"** for tasks you plan to work on
2. **Use "In Progress"** for tasks you're actively working on (limit to 2-3 tasks)
3. **Use "Done"** for completed tasks
4. **Move tasks frequently** to keep your board up-to-date
5. **Check the counters** to see your progress at a glance

## 🎊 That's It!

The Kanban board is simple but powerful:
- ✅ Create tasks (they start in "To Do")
- ✅ Move them to "In Progress" when you start
- ✅ Move them to "Done" when complete
- ✅ All changes are saved automatically
- ✅ Activity feed tracks all movements

**Try it now!** Create a task and move it between columns using the dropdown. It's that easy! 🚀
