# 🎬 Quick Demo: Moving Tasks on Kanban Board

## 🎯 30-Second Demo

### What You'll See

Your Kanban board looks like this:

```
┌──────────────────────────────────────────────────────────────────────┐
│  ← Back  |  My Project                                               │
│                                                                       │
│  [🔍 Filters] [⏰ Activity] [+ Add Task]                             │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────┬──────────────┬──────────────┐
│  📋 TO DO    │ ⚡ IN PROGRESS│  ✅ DONE     │
│     [3]      │     [2]       │     [1]      │
├──────────────┼──────────────┼──────────────┤
│              │              │              │
│ ┌──────────┐ │ ┌──────────┐ │ ┌──────────┐ │
│ │Task A    │ │ │Task D    │ │ │Task F    │ │
│ │          │ │ │          │ │ │          │ │
│ │[To Do ▼] │ │ │[In Prog▼]│ │ │[Done ▼]  │ │
│ └──────────┘ │ └──────────┘ │ └──────────┘ │
│              │              │              │
│ ┌──────────┐ │ ┌──────────┐ │              │
│ │Task B    │ │ │Task E    │ │              │
│ │          │ │ │          │ │              │
│ │[To Do ▼] │ │ │[In Prog▼]│ │              │
│ └──────────┘ │ └──────────┘ │              │
│              │              │              │
│ ┌──────────┐ │              │              │
│ │Task C    │ │              │              │
│ │          │ │              │              │
│ │[To Do ▼] │ │              │              │
│ └──────────┘ │              │              │
│              │              │              │
└──────────────┴──────────────┴──────────────┘
```

## 🎮 Interactive Demo

### Step 1: Create a Task

1. Click **"+ Add Task"** button (top right)
2. Fill in:
   ```
   Title: "Test Kanban Movement"
   Priority: Medium
   ```
3. Click **"Create Task"**
4. ✅ Task appears in **"To Do"** column

### Step 2: Start Working (Move to In Progress)

1. Find your task in the **"To Do"** column
2. Look at the bottom of the task card
3. You'll see: **[📋 To Do ▼]**
4. **Click on it** - a dropdown opens:
   ```
   ┌─────────────────┐
   │ 📋 To Do       ✓│ ← Currently selected
   │ ⚡ In Progress  │ ← Click this!
   │ ✅ Done         │
   └─────────────────┘
   ```
5. Click **"⚡ In Progress"**
6. ✨ **Watch the magic!** Task disappears from "To Do" and appears in "In Progress"

### Step 3: Complete the Task (Move to Done)

1. Find your task in the **"In Progress"** column
2. Look at the dropdown (now shows **[⚡ In Progress ▼]**)
3. **Click on it** - dropdown opens:
   ```
   ┌─────────────────┐
   │ 📋 To Do        │
   │ ⚡ In Progress ✓│ ← Currently selected
   │ ✅ Done         │ ← Click this!
   └─────────────────┘
   ```
4. Click **"✅ Done"**
5. ✨ Task moves to the **"Done"** column!

### Step 4: Check Activity Feed

1. Click the **"Activity"** button (purple, top right)
2. See the activity log:
   ```
   📊 Activity Feed
   
   👤 You moved "Test Kanban Movement" to Done
      2 seconds ago
   
   👤 You moved "Test Kanban Movement" to In Progress
      15 seconds ago
   
   👤 You created "Test Kanban Movement"
      30 seconds ago
   ```

## 🎨 Visual Flow

### Complete Journey of a Task

```
STEP 1: CREATE TASK
┌─────────────┐
│   TO DO     │
├─────────────┤
│ [New Task]  │ ← Task created here
└─────────────┘

        ↓ (Click dropdown, select "In Progress")

STEP 2: START WORKING
┌─────────────┐
│ IN PROGRESS │
├─────────────┤
│ [New Task]  │ ← Task moved here
└─────────────┘

        ↓ (Click dropdown, select "Done")

STEP 3: COMPLETE
┌─────────────┐
│    DONE     │
├─────────────┤
│ [New Task]  │ ← Task completed here
└─────────────┘
```

## 🎯 Real-World Example

### Scenario: Building a Login Feature

**1. Create the task**
```
Title: "Build login page"
Priority: High
Labels: Frontend, Feature
Checklist:
  - Design UI
  - Write code
  - Add validation
  - Test
```

**2. Task starts in "To Do"**
```
┌─────────────────────────────────┐
│ 🔵Frontend 🔵Feature            │
│ Build login page         🔴High │
│ ✅ 0/4 ░░░░░░░░░░ 0%           │
│ [📋 To Do ▼]                    │
└─────────────────────────────────┘
```

**3. Start working → Move to "In Progress"**
```
Click dropdown → Select "In Progress"

┌─────────────────────────────────┐
│ 🔵Frontend 🔵Feature            │
│ Build login page         🔴High │
│ ✅ 2/4 ████████░░ 50%           │ ← Progress updated
│ [⚡ In Progress ▼]              │
└─────────────────────────────────┘
```

**4. Finish work → Move to "Done"**
```
Click dropdown → Select "Done"

┌─────────────────────────────────┐
│ 🔵Frontend 🔵Feature            │
│ Build login page         🔴High │
│ ✅ 4/4 ██████████ 100%          │ ← All done!
│ [✅ Done ▼]                     │
└─────────────────────────────────┘
```

## 🎮 Try These Scenarios

### Scenario 1: Daily Workflow
```
Morning:
1. Create 3 tasks for today
2. All appear in "To Do"

Start work:
3. Move first task to "In Progress"
4. Work on it
5. Move to "Done" when complete

Continue:
6. Move second task to "In Progress"
7. Repeat until all done
```

### Scenario 2: Team Collaboration
```
1. Create task: "Review pull request"
2. Assign to team member
3. They move it to "In Progress" when reviewing
4. They move it to "Done" when approved
5. Check Activity feed to see who did what
```

### Scenario 3: Bug Fixing
```
1. Create task: "Fix login bug"
2. Add label: Bug (red)
3. Set priority: High
4. Move to "In Progress" when investigating
5. Move to "Done" when fixed
```

## 📱 Mobile-Friendly

The dropdown works on mobile too:
```
Tap the status dropdown
↓
Select new status
↓
Task moves instantly
```

## ⚡ Pro Tips

1. **Keep "In Progress" small** - Only 2-3 tasks at a time
2. **Move tasks frequently** - Keep your board updated
3. **Use filters** - Find tasks quickly
4. **Check counters** - See progress at a glance
5. **Review "Done"** - Celebrate completed work!

## 🎊 Summary

**How to move tasks**:
1. Click the dropdown on any task card
2. Select new status (To Do / In Progress / Done)
3. Task moves instantly
4. Activity is logged automatically

**That's it!** Simple, fast, and effective. 🚀

---

**Try it now!** Open your project and move some tasks around. You'll get the hang of it in seconds! 🎯
